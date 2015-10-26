var MapApp = React.createClass({
  getDefaultProps: function () {
               return {
                       initialZoom: 15,
                       mapCenterLat: 43.6425569,
                       mapCenterLng: -79.4073126,
               };
       },

       componentDidMount: function (rootNode) {
               var mapOptions = {
                       center: this.mapCenterLatLng(),
                       zoom: this.props.initialZoom
               },
               map = new google.maps.Map(rootNode, mapOptions);

               this.setState({map: map});
       },

       mapCenterLatLng: function () {
               var props = this.props;

               return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
       },

       componentDidUpdate: function () {
               var map = this.state.map;

               map.panTo(this.mapCenterLatLng());
       },

       render: function () {
               var style = {
                       width: '500px',
                       height: '500px'
               };

               return (
                       <div className='map' style={style}></div>
               );
       }
});
