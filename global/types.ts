export type Contact = {
	id: string;
	name: string;
	email: string;
	phone: string;
};

export type ActionParams = {
  action: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}