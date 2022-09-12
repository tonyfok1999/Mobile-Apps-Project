export class CreateUserDto {
  id: number;
  email: string;
  password: string;
  nickname: string | null;
  phone: number | null;
  gender_id: number | null;
  profile_photo: string | null; 
  is_worker: boolean;
  worker_info_id: number | null;
  score: number | null;
}
