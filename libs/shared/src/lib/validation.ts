import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginValidationDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class RegisterValidationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;
}

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  type!: 'file' | 'folder';

  @IsString()
  path!: string;

  @IsString()
  content?: string;
}

export class UpdateFileDto {
  @IsString()
  name?: string;

  @IsString()
  content?: string;
}
