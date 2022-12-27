import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Jwtpayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.signUp(createUserDto);
  }

  async signIn(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      createUserDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: Jwtpayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
