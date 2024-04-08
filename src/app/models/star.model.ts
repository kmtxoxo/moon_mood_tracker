export interface Star {
  starId: number;
  positionX: number;
  positionY: number;
  color: "yellow" | "white";
  twinkle: boolean;
  twinkleDelay : number;
}
