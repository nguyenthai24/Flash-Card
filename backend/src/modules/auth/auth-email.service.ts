import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthEmailService {
  private readonly logger = new Logger(AuthEmailService.name);

  constructor(private readonly config: ConfigService) {}

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const url = new URL('/verify-email/result', this.frontendUrl());
    url.searchParams.set('token', token);
    await this.send(
      email,
      'Xác minh địa chỉ email',
      this.linkHtml(url, 'Xác minh email'),
    );
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const url = new URL('/reset-password', this.frontendUrl());
    url.searchParams.set('token', token);
    await this.send(
      email,
      'Đặt lại mật khẩu FlashCard',
      this.linkHtml(url, 'Đặt mật khẩu mới'),
    );
  }

  private async send(to: string, subject: string, html: string): Promise<void> {
    const apiKey = this.config.get<string>('email.resendApiKey');
    const from = this.config.get<string>('email.from');
    if (!apiKey || !from) {
      throw new ServiceUnavailableException({
        code: 'EMAIL_NOT_CONFIGURED',
        message: 'Dịch vụ gửi email chưa được cấu hình.',
      });
    }

    let response: Response;
    try {
      response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to: [to], subject, html }),
      });
    } catch {
      this.logger.error('Resend API request failed.');
      throw new ServiceUnavailableException({
        code: 'EMAIL_DELIVERY_FAILED',
        message: 'Không thể gửi email lúc này. Vui lòng thử lại sau.',
      });
    }

    if (!response.ok) {
      throw new ServiceUnavailableException({
        code: 'EMAIL_DELIVERY_FAILED',
        message: 'Không thể gửi email lúc này. Vui lòng thử lại sau.',
      });
    }
  }

  private frontendUrl(): string {
    return (
      this.config.get<string>('app.frontendUrl') ?? 'http://localhost:3010'
    );
  }

  private linkHtml(url: URL, label: string): string {
    return `<p>Xin chào,</p><p>Vui lòng nhấn nút bên dưới để tiếp tục.</p><p><a href="${url.toString()}">${label}</a></p><p>Nếu bạn không yêu cầu thao tác này, hãy bỏ qua email.</p>`;
  }
}
