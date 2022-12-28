export class SimulationTime {
  private defaultTime!: number;

  constructor(public time: Date, public delayTick: number, public realTickMs:number) {
    this.defaultTime = time.getTime();
  }

  public configurate(h: number, mm: number, ss: number) {
    this.time.setHours(h, mm, ss);
    this.defaultTime = this.time.getTime();
  }

  public getTickDelta() {
    return +this.time - this.defaultTime;
  }

  public reset(): void {
    this.time.setTime(this.defaultTime);
  }

  public addTick(): void {
    this.time.setTime(this.time.getTime() + this.realTickMs);
  }

  public getDisplayTime(): string {
    let timeStr =  this.time.toLocaleTimeString('ru-RU');
    return timeStr.slice(0,timeStr.length-3);
  }
}
