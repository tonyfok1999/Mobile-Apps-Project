export class CreateOrderDto {
  id: number;
  user_id: number;
  worker_id: number;
  state_id: number;
  service_subtype_id: number;
  working_address: string;
  working_date: string;
  budget: number;
  voice_message: string;
  voice_text: string;
  score_by_user: number;
  score_by_worker: number;
  created_at: number;
  updated_at: number;
}
