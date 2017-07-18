import { Component, PropTypes } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

class OverlayLayer extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.draw = this.draw.bind(this);
    this.overlayContainer = null;

    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#OverlayView
    const overlayView = new window.google.maps.OverlayView();

    // As stated by Google these three methods must implemented: onAdd(), draw(), and onRemove().
    overlayView.onAdd = this.onAdd;
    overlayView.draw = this.draw;
    overlayView.onRemove = this.onRemove;

    // You must call setMap() with a valid Map object to trigger the call to
    // the onAdd() method and setMap(null) in order to trigger the onRemove() method.
    overlayView.setMap(props.map);

    this.state = { overlayView };
  }

  componentWillMount() {
    const onAddOverlay = this.props.onAddOverlay;
    if (onAddOverlay) {
      // If onAddOverlay is saving anything to parent component's state,
      // it must be called here to avoid warnings.
      onAddOverlay(this.state.overlayView);
    }
  }

  componentDidUpdate() {
    this.draw();
  }

  componentWillUnmount() {
    const overlayView = this.state.overlayView;
    if (overlayView) {
      overlayView.setMap(null);
      overlayView.onAdd = null;
      overlayView.draw = null;
      overlayView.onRemove = null;
    }
  }

  onAdd() {
    // Create container for this custom "marker"
    this.overlayContainer = document.createElement(`div`);
    this.overlayContainer.style.position = `absolute`;
    this.overlayContainer.dataset.overlayId = this.props.id;
  }

  onRemove() {
    // Remove container from parent node and tell React about it too
    this.overlayContainer.parentNode.removeChild(this.overlayContainer);
    unmountComponentAtNode(this.overlayContainer);
  }

  draw() {
    const overlayView = this.state.overlayView;
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapCanvasProjection
    const overlayProjection = overlayView.getProjection();

    // render children to overlayContainer.
    if (this.overlayContainer) {
      this.overlayContainer.innerHTML = '';
      render(this.props.children, this.overlayContainer);
    }

    // Add the element to the "overlayMouseTarget" pane.
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
    const mapPanes = this.state.overlayView.getPanes();

    if (mapPanes && this.overlayContainer) {
      const geolocation = this.props.geolocation;
      const googleLatLng = new window.google.maps.LatLng({
        lat: geolocation.lat,
        lng: geolocation.lng,
      });
      const point = overlayProjection.fromLatLngToDivPixel(googleLatLng);

      if (point) {
        this.overlayContainer.style.left = `${point.x}px`;
        this.overlayContainer.style.top = `${point.y}px`;
        this.overlayContainer.style.height = `0`;
      }

      // overlayMouseTarget might not be a correct pane - overlayLayer is used by some services
      mapPanes.overlayMouseTarget.appendChild(this.overlayContainer);

      window.google.maps.event.addDomListener(this.overlayContainer, 'click', event => {
        // TODO: Click handler needs to open info window at some point
        // eslint-disable-next-line no-console
        console.log(
          `OverlayLayer (${event.target.closest('[data-overlay-id]').dataset.overlayId}) clicked.`
        );
        window.google.maps.event.trigger(self, 'click');
      });
    }
  }

  render() {
    return null;
  }
}

OverlayLayer.defaultProps = { children: null, map: null, onAddOverlay: null };

const { func, node, number, object, shape, string } = PropTypes;

OverlayLayer.propTypes = {
  children: node,
  geolocation: shape({ lat: number, lng: number }).isRequired,
  id: string.isRequired,
  map: object,
  onAddOverlay: func,
};

export default OverlayLayer;
