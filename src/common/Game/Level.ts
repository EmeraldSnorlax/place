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

  private solution: Location

  constructor() {
    this.Ready = new Promise((resolve) => {
      fetch(`https://api.openaerialmap.org/meta?page=${Math.floor(Math.random() * 100)}`)
        .then((res) => res.json())
        .then((res: OAM.Catalogue) => {
          // 100 (0 -> 99) items per page
          const item = res.results[Math.floor(Math.random() * 100)]
          this.id = item._id
          this.solution = { lat:  item.bbox[0], lon: item.bbox[1] }
          this.image = item.properties.thumbnail
          this.tms = item.properties.tms
          this.attribution = item.provider

          resolve(true)
        })
    })
  }
}