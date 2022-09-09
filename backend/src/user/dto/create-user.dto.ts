export class CreateUserDto {
  id: number;
  email: string;
  password: string;
  nickname: string;
  phone: number;
  gender_id: number;
  profile_photo: string;
  is_worker: boolean;
  worker_info_id: number;
  score: number;
}
