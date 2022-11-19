export default class RouteDTO{
    constructor() {
      this.Name='';
      this.Xml = '';
      this.Track=[];
      this.Distance = null;
      this.Elevation = null;
      this.SelectedPoint = null;
      this.SlopeResolution = 100;
      this.SlowExpectedSpeed = 22;
      this.MediumExpectedSpeed= 25;
      this.HighExpectedSpeed = 27;
    }
  }