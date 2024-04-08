export class MoonFx {
  /**
   * Radius of Earth in miles
   */
  private readonly EARTH_RADIUS_MI = 3959;

  /**
   * Length of one day in seconds
   */
  private readonly ONE_DAY = 86400;

  /**
   * Moon's synodic period
   */
  private readonly SYNODIC_PERIOD = 29.530589;

  /**
   * Value of PI in radians
   */
  private readonly PI_RADIANS = Math.PI * 2;

  /**
   * Current date
   *
   * @type long
   */
  private moonDate: number = new Date().getTime();

  /**
   * converts moon phase angle to degrees
   * @returns deg string
   */
  public toDegrees(phaseAngle: number): string {
    var deg = parseInt(phaseAngle.toString()),
      min = Math.floor((phaseAngle - deg) * 60),
      sec = Math.round((min - Math.trunc(min)) * 60),
      degString =
        deg.toString() +
        '&deg; ' +
        min.toString() +
        '&prime; ' +
        sec.toString() +
        '&Prime; ';

    return degString;
  }

  /**
   * calculates moons age based on synodicPhase
   * @returns age string that contains days and hours of moon
   */
  public toDaysHours(synodicPhase: number) {
    var day = parseInt(synodicPhase.toString()),
      hour = ((synodicPhase - day) * 24).toFixed(0),
      dayString = `${day.toString()} days ${hour} hours`;

    return dayString;
  }

  public moonInformations = {
    synodicAge: this.toDaysHours(this.getSynodicPhase()),
    julianDate: this.getJulianDate().toFixed(4),
    phaseAngle: this.toDegrees(this.getPhaseAngle()),
    distance:
      (this.getDistanceInEarthRadii() * this.EARTH_RADIUS_MI)
        .toFixed(0)
        .toString() + ' mi',
    illumination:
      (this.getIlluminatedRatio() * 100).toFixed(0).toString() + '%',
  };

  calculateMoonInformations(): void {
    this.moonInformations = {
      synodicAge: this.toDaysHours(this.getSynodicPhase()),
      julianDate: this.getJulianDate().toFixed(4),
      phaseAngle: this.toDegrees(this.getPhaseAngle()),
      distance:
        (this.getDistanceInEarthRadii() * this.EARTH_RADIUS_MI)
          .toFixed(0)
          .toString() + ' mi',
      illumination:
        (this.getIlluminatedRatio() * 100).toFixed(0).toString() + '%',
    };
  }

  /**
   * Set the current date
   * @param {Date} date
   */
  public setDate(date: Date): void {
    this.moonDate = date.getTime();
    this.calculateMoonInformations();
  }

  /**
   * Get current date
   * @returns {long}
   */
  public getDate(): number {
    return this.moonDate;
  }

  /**
   * Get current Julian Date
   * @returns {Number}
   */
  public getJulianDate() {
    var time: number = this.getDate();

    return time / 1000 / this.ONE_DAY + 2440587.5;
  }

  /**
   * Get current synodic phase (Moon's age)
   * @returns {Number}
   */
  public getSynodicPhase(): number {
    var julianDate = this.getJulianDate(),
      synodicPhase =
        this._normalize((julianDate - 2451550.1) / this.SYNODIC_PERIOD) *
        this.SYNODIC_PERIOD;

    return synodicPhase;
  }

  /**
   * Get current distance to the moon in Earth Radii
   *
   * @returns {Number}
   */
  public getDistanceInEarthRadii(): number {
    var distanceInRadians =
        this._normalize((this.getJulianDate() - 2451562.2) / 27.55454988) *
        this.PI_RADIANS,
      synodicPhaseInRadians = this.getSynodicPhase() * this.PI_RADIANS,
      distance =
        60.4 -
        3.3 * Math.cos(distanceInRadians) -
        0.6 * Math.cos(2 * synodicPhaseInRadians - distanceInRadians) -
        0.5 * Math.cos(2 * synodicPhaseInRadians);

    return distance;
  }

  /**
   * Get Moon's current ecliptic latitude
   * @returns {Number}
   */
  public getEclipticLatitude(): number {
    var value = this._normalize(
        (this.getJulianDate() - 2451565.2) / 27.212220817
      ),
      eclipticLatitude = 5.1 * Math.sin(value * this.PI_RADIANS);

    return eclipticLatitude;
  }

  /**
   * Get Moon's current ecliptic longitude
   * @returns {Number|_L1.MoonFx.MoonFx.prototype.getEclipticLongitude.value}
   */
  public getEclipticLongitude(): number {
    var synodicPhaseInRadians = this.getSynodicPhase() * this.PI_RADIANS,
      distanceInRadians =
        this._normalize((this.getJulianDate() - 245162.2) / 27.55454988) *
        this.PI_RADIANS,
      value = this._normalize(
        (this.getJulianDate() - 2451555.8) / 27.321582241
      ),
      eclipticLongitude =
        360 * value +
        6.3 +
        Math.sin(distanceInRadians) +
        1.3 * Math.sin(2 * synodicPhaseInRadians - distanceInRadians) +
        1.3 * 0.7 * Math.sin(2 * synodicPhaseInRadians);

    return eclipticLongitude;
  }

  /**
   * Get the current phase angle
   *
   * @param {Number} synodicAge
   * @returns {Number}
   */
  public getPhaseAngle(synodicAge?: number): number {
    synodicAge = synodicAge ? synodicAge : this.getSynodicPhase();

    let phaseAngle: number = synodicAge * (360 / this.SYNODIC_PERIOD);

    if (phaseAngle > 360) {
      phaseAngle = phaseAngle - 360;
    }

    return phaseAngle;
  }

  /**
   * Get moon illuminated ratio (in decimals)
   * @param {Number} synodicAge
   * @returns {Number}
   */
  public getIlluminatedRatio(synodicAge?: number): number {
    synodicAge = synodicAge ? synodicAge : this.getSynodicPhase();

    var phaseAngle = this.getPhaseAngle(synodicAge),
      ratioOfIllumination = 0.5 * (1 - Math.cos(this._deg2rad(phaseAngle)));

    return ratioOfIllumination;
  }

  /**
   * Normalize a number
   *
   * @param {Number} value
   * @returns {Number}
   */
  public _normalize(value: number): number {
    value = value - parseInt(value.toString());
    if (value < 0) {
      value = value + 1;
    }
    return value;
  }

  /**
   * Convert degrees to radians
   *
   * @param {Number} x
   * @returns {Number|@exp;Math@pro;PI}
   */
  public _deg2rad(x: number): number {
    return x * (Math.PI / 180);
  }

  /**
   * Find a number's sign
   *
   * @param {Number} $x
   * @returns {int}
   */
  public _signum(x: number): number {
    return Math.trunc(Math.abs(x) - x ? -1 : 0);
  }
}
