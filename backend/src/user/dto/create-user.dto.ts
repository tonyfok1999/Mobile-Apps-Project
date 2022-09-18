export class CreateUserDto {
  id?: number | null;
  email: string | null;
  password: string | null;
  nickname: string | null;
  phone: number | null;
  gender_id?: number | null;
  profile_photo?: string | null;
  is_worker: boolean;
  worker_info_id?: number | null;
  score?: number | null;
  workerSubtypeId: number[] | null;
}
