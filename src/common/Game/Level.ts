interface Location {
  lat: number
  lon: number
}

export default class Level {

  /**
   * Ready
   * @description Promise that resolves to true when Level is ready.
   */
  public Ready: Promise<true>

  /**
   * id
   * @description id of the imagery in oam's catalogue.
   */
  public id: string

  /**
   * image
   * @description Link to the raster image. Usually png or jpeg.
   */
  public image: string

  /**
   * TMS
   * @description Link for the TMS. Not yet used or implemented.
   */
  public tms: string

  /**
   * Attribution
   * @description The provider of the imagery.
   */
  public attribution: string

  /**
   * Bounding box
   * @description Bounding box for the imagery.
   */
  public bbox: number[];

  /**
   * Center
   * @description The center of the image, found by averaging the bounding box.
   */
  public center: Location

  /**
   * Constructor
   * @description Creates a new Level.
   * @returns itself, but values are not yet populated. `await Level.ready`
   */
  constructor() {
    this.Ready = new Promise((resolve) => {
      fetch(`https://api.openaerialmap.org/meta?page=${Math.floor(Math.random() * 100)}`)
        .then((res) => res.json())
        .then((res: OAM.Catalogue) => {
          // 100 (0 -> 99) items per page
          const item = res.results[Math.floor(Math.random() * 100)]
          this.id = item._id
          this.center = {
            // We average the bounding box to get the center
            lon: Number(((item.bbox[0] + item.bbox[2]) / 2).toFixed(6)),
            lat: Number(((item.bbox[1] + item.bbox[3]) / 2).toFixed(6))
          }
          this.image = item.properties.thumbnail
          this.tms = item.properties.tms
          this.attribution = item.provider
          this.bbox = item.bbox

          resolve(true)
        })
    })
  }
  
  /**
   * Degrees to radians
   * @param deg Angle in degrees
   * @returns Angle in radians
   * @see https://en.wikipedia.org/wiki/Radian
   */
  private degToRad(deg: number): number {
    return deg * (Math.PI / 180)
  }

  /**
   * Solution for a level
   * @param guess Latitude and longitude
   * @returns Distance between points in km
   * @see https://en.wikipedia.org/wiki/Haversine_formula
   * @see https://gist.github.com/Phoenix2k/43cbcf6de6cd6410f25dcbdc895acb67
   */
  solution(guess: Location): number {
		const Earth = 6371; // Radius of the Earth in km
		const x = ( guess.lon - this.center.lon ) * Math.PI / 180 * Math.cos( ( ( this.center.lon + guess.lon ) / 2 ) * Math.PI / 180 );
		const y = ( guess.lat - this.center.lat ) * Math.PI / 180;
		return Earth * Math.sqrt( x * x + y * y );
  }
}
