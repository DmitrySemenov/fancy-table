export interface FancyDataRaw {
  _id: string;
  isActive: boolean;
  balance?: string;
  picture: string;
  age: number;
  name?: { first?: string; last?: string };
  company?: string;
  email?: string;
  address: string;
  tags: string[];
  favoriteFruit: string;
}

export class FancyData {
  readonly id: string;
  readonly isActive: boolean;
  readonly balance: string;
  readonly picture: string;
  readonly age: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly company: string;
  readonly email: string;
  readonly address: string;
  readonly tags: string[];
  readonly favoriteFruit: string;

  constructor({
    id,
    isActive,
    balance,
    picture,
    age,
    firstName,
    lastName,
    company,
    email,
    address,
    tags,
    favoriteFruit,
  }: Partial<FancyData> = {}) {
    this.id = id || '';
    this.isActive = isActive || false;
    this.balance = balance || '';
    this.picture = picture || '';
    this.age = age || 0;
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.company = company || '';
    this.email = email || '';
    this.address = address || '';
    this.tags = tags || [];
    this.favoriteFruit = favoriteFruit || '';
  }
}
