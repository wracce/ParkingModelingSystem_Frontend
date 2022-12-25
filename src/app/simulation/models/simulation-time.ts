export class SimulationTime {
  private defaultTime!: number;

  constructor(public time: Date, public delayMs: number) {
    this.defaultTime = time.getTime();
  }

  public configurate(h: number, mm: number, ss: number) {
    this.time.setHours(h, mm, ss);
    this.defaultTime = this.time.getTime();
  }

  public getDelta() {
    return +this.time - this.defaultTime;
  }
  
  public reset(): void {
    this.time.setTime(this.defaultTime);
  }

  public addTick(): void {
    this.time.setTime(this.time.getTime() + this.delayMs);
    console.log(this.time);
  }

  public getDisplayTime(): string {
    return this.time.toLocaleTimeString('ru-RU');
  }
}
