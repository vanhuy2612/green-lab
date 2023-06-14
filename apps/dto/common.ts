import { ApiProperty } from "@nestjs/swagger";

export enum OTPAction {
  DEFAULT = "DEFAULT",
  SIGN_UP = "SIGN_UP",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
}

export enum OrderBy {
  desc = "desc",
  asc = "asc",
}

export enum AreaListCitiesSortBy {
  code = "code",
  name = "name",
}

export enum AreaListDistrictsSortBy {
  code = "code",
  name = "name",
  provinceCityCode = "provinceCityCode",
}

export enum AreaListVillagesSortBy {
  code = "code",
  name = "name",
  provinceCityCode = "provinceCityCode",
  villageCode = "villageCode",
}
export class ProvinceCityDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;
}
export class VillageDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  provinceCityCode: string;

  @ApiProperty()
  districtCode: string;
}
export class DistrictDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  provinceCityCode: string;
}
export class ProfileDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  provinceCityId?: number;

  @ApiProperty()
  districtId?: number;

  @ApiProperty()
  villageId?: number;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  sex: number;

  @ApiProperty()
  regionCode: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  // Relation
  @ApiProperty({ type: ProvinceCityDTO })
  provinceCity: ProvinceCityDTO;
  @ApiProperty({ type: DistrictDTO })
  district: DistrictDTO;
  @ApiProperty({ type: VillageDTO })
  village: VillageDTO;
}
export class AccountDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roleId: number;
}
