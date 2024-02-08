import { DistributionType } from "./distribution-type";

export interface Distribution {
    distributionType: DistributionType,
    nextValue():number;
}
