import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeterminateDistribution } from '../../models/distributions/determinate-distribution';
import { Distribution } from '../../models/distributions/distribution';
import { DistributionType } from '../../models/distributions/distribution-type';
import { ExponetialDistribution } from '../../models/distributions/exponetial-distribution';
import { NormalDistribution } from '../../models/distributions/normal-distribution';
import { UniformDistribution } from '../../models/distributions/uniform-distribution';

@Component({
  selector: 'app-dialog-configurate-distribution',
  templateUrl: './dialog-configurate-distribution.component.html',
  styleUrls: ['./dialog-configurate-distribution.component.scss'],
})
export class DialogConfigurateDistributionComponent {
  distributionForm!: FormGroup;
  public distributions = DistributionType;
  constructor(@Inject(MAT_DIALOG_DATA) public distribution: Distribution) {

    switch (this.distribution.distributionType) {
      case DistributionType.DETERMINATE:
        let determinateDistribution = this
        .distribution as DeterminateDistribution;
        this.distributionForm = new FormGroup({
          value: new FormControl(determinateDistribution.value)
        });
        break;
      case DistributionType.EXPONETIAL:
        let exponetialDistribution = this
        .distribution as ExponetialDistribution;
        this.distributionForm = new FormGroup({
          lambda: new FormControl(exponetialDistribution.lambda)
        });
        break;
      case DistributionType.UNIFORM:
        let uniformDistribution = this.distribution as UniformDistribution;
        this.distributionForm = new FormGroup({
          max: new FormControl(uniformDistribution.min),
          min: new FormControl(uniformDistribution.max)
        });
        break;
      case DistributionType.NORMAL:
        let normalDistribution = this.distribution as NormalDistribution;
        this.distributionForm = new FormGroup({
          mx: new FormControl(normalDistribution.mx),
          dx: new FormControl(normalDistribution.dx)
        });
        break;
    }
  }
  public changeDistribution() {
    switch (this.distribution.distributionType) {
      case DistributionType.DETERMINATE:
        let determinateDistribution = this
        .distribution as DeterminateDistribution;
        determinateDistribution.value = this.distributionForm.value['value'];
        break;
      case DistributionType.EXPONETIAL:
        let exponetialDistribution = this
        .distribution as ExponetialDistribution;
        exponetialDistribution.lambda = this.distributionForm.value['lambda'];
        break;
      case DistributionType.UNIFORM:
        let uniformDistribution = this.distribution as UniformDistribution;
        uniformDistribution.min = this.distributionForm.value['min'];
        uniformDistribution.max = this.distributionForm.value['max'];
        break;
      case DistributionType.NORMAL:
        let normalDistribution = this.distribution as NormalDistribution;
        normalDistribution.mx = this.distributionForm.value['mx'];
        normalDistribution.dx = this.distributionForm.value['dx'];
        break;
    }
  }

}
