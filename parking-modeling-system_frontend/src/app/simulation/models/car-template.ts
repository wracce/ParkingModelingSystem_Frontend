export class CarTemplate {
    src!: string;
    height!: number;
    width!: number;

    constructor(src:string,height: number,width: number){
        this.height = height;
        this.width = width;
        this.src = src;
    }
}
