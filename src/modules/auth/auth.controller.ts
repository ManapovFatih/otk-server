import { AuthResponseDto } from './dto/auth-response.dto';
import { ValidateCustomHeadersDto } from '../users/session/dto/validate-custom-headers.dto';
import { Body, Controller, Post, Req, UseGuards, Res, Patch, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Token } from '../../interfaces/Token.interface';
import { Tokens } from '../../interfaces/Tokens.interface';
import { AuthService } from './auth.service';
import { JWT_TOKEN_EXAMPLE } from '../../config/constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LogInUserDto } from './dto/log-in-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { BrowserDataDto } from '../../modules/users/session/dto/browser-data.dto';
import { CustomHeaders } from '../../decorators/headers.decorator';
import { TokenService } from './token.service';
import { refreshCookieOptions } from '../../config/cookieOptions';
import { FileInterceptor } from '@nestjs/platform-express';
import AuthResult from '../../interfaces/AuthResult.interface';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private tokenService: TokenService) {}

    @ApiOperation({ summary: 'Log in' })
    @ApiResponse({
        status: 201,
        type: AuthResponseDto,
    })
    @Post('login')
    async logIn(
        @CustomHeaders() headers: ValidateCustomHeadersDto,
        @Req() request: Request,
        @Body() logInUserDto: LogInUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const browserDataDto: BrowserDataDto = {
            userAgent: request.get('User-Agent'),
            ip: request.ip,
            fingerprint: request.get('fingerprint'),
        };
        const authData: AuthResult = await this.authService.login(logInUserDto, browserDataDto);
        const expires = this.tokenService.getNewExpiresAtForRefreshToken();
        res.cookie('refreshToken', authData.tokens.refreshToken, { ...refreshCookieOptions, expires: expires });
        return { user: authData.user, accessToken: authData.tokens.accessToken };
    }

    @ApiOperation({ summary: 'Sign Up/Registration ' })
    @ApiResponse({
        status: 201,
        type: AuthResponseDto,
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    @Post('register')
    async register(
        @CustomHeaders()
        headers: ValidateCustomHeadersDto,
        @Req() request: Request,
        @Body() userDto: RegisterUserDto,
        @Res({ passthrough: true }) res: Response,
        @UploadedFile() image: Express.Multer.File,
    ) {
        const browserDataDto: BrowserDataDto = {
            userAgent: request.get('user-agent'),
            ip: request.ip,
            fingerprint: request.get('fingerprint'),
        };

        const authData: AuthResult = await this.authService.register(userDto, browserDataDto, image);
        const expires = this.tokenService.getNewExpiresAtForRefreshToken();
        res.cookie('refreshToken', authData.tokens.refreshToken, { ...refreshCookieOptions, expires: expires });
        return { user: authData.user, accessToken: authData.tokens.accessToken };
    }

    @ApiOperation({ summary: 'Log out' })
    @ApiResponse({
        status: 201,
    })
    @Patch('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() request: Request, @Res({ passthrough: true }) res: Response) {
        const refreshToken: Token | undefined = request.cookies.refreshToken;

        if (refreshToken) {
            await this.authService.logout(refreshToken);
        }
        request.user = undefined;
        res.clearCookie('refreshToken');
    }

    @ApiOperation({ summary: 'Create new access token, and update refresh token' })
    @ApiResponse({
        status: 200,
        schema: {
            example: {
                accessToken: JWT_TOKEN_EXAMPLE,
            },
        },
    })
    @Patch('refreshToken')
    async refreshToken(
        @Req() request: Request,
        @CustomHeaders() headers: ValidateCustomHeadersDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const browserDataDto: BrowserDataDto = {
            userAgent: request.get('User-Agent'),
            ip: request.ip,
            fingerprint: request.get('fingerprint'),
        };
        const cookies = request.cookies;
        const refreshToken: Token = cookies.refreshToken;

        const tokens: Tokens = await this.authService.refresh(refreshToken, browserDataDto);
        const expires = this.tokenService.getNewExpiresAtForRefreshToken();
        res.cookie('refreshToken', tokens.refreshToken, { ...refreshCookieOptions, expires: expires });
        return { accessToken: tokens.accessToken };
    }



	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Init' })
    @ApiResponse({
        status: 200,
        type: AuthResponseDto,
    })
    @Get('init')
    async init(
        @CustomHeaders() headers: ValidateCustomHeadersDto,
        @Req() request: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        return request.user
    }
}
