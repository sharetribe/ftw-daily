import routeConfiguration from '../routeConfiguration';
import { createResourceLocatorString } from '../util/routes';

export const handleSearch = ({ values, history }) => {
    const { search, selectedPlace } = values.location;
    const { bounds } = selectedPlace;
    
    const searchParams = {
        address: search,
        bounds
    };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
}