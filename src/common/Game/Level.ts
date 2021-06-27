interface Location {
  lat: number
  lon: number
}

export default class Level {
  public Ready: Promise<true>
  public id: string
  public image: string
  public tms: string
  public attribution: string
  public bbox: number[];

  public center: Location


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
            lat: Number(((item.bbox[0] + item.bbox[2]) / 2).toFixed(6)),
            lon: Number(((item.bbox[1] + item.bbox[3]) / 2).toFixed(6))
          }
          this.image = item.properties.thumbnail
          this.tms = item.properties.tms
          this.attribution = item.provider
          this.bbox = item.bbox

          resolve(true)
        })
    })
  }
}