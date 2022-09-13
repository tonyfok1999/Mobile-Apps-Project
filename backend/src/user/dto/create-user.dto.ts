export class CreateUserDto {
  email: string;
  password: string;
  nickname: string;
  phone: number;
  gender_id?: number | null;
  profile_photo?: string | null;
  is_worker: boolean;
  worker_info_id?: number | null;
  score?: number;
  workerSubtypeId: number[];
}
