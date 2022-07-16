import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

import "./autoCompletePlace.css";
const AutoCompletePlace = ({ setAddress, setEventCoordinates, setRegion }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 500,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element

    setValue(e.target.value);
    setAddress(e.target.value);
  };

  const handleRegion = (region) => {
    const splitRegion = region.split(" ");

    if (region.includes("חיפה") || region.includes("הצפון")) setRegion("צפון");
    else if (region.includes("אביב") || region.includes("המרכז"))
      setRegion("מרכז");
    else if (region.includes("הדרום")) setRegion("דרום");
    else setRegion(splitRegion[1]);
  };

  const isNoRegion = (unRegion) => {
    if (unRegion.geometry.location.lat() < 32.55209815678235)
      setRegion("יהודה ושומרון");
    else setRegion("הצפון");
  };

  const getRegion = (regionResult) => {
    if (regionResult[0]) {
      const arrayOfFormatsLocation = regionResult[0].address_components;

      for (const formatLocation of arrayOfFormatsLocation) {
        const region = Object.values(formatLocation).find((val) => {
          return val.includes("מחוז") ? val : null;
        });

        if (region) {
          handleRegion(region);

          break;
        } else isNoRegion(regionResult[0]);
      }
    }
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      setAddress(description);

      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        getRegion(results);
        const { lat, lng } = getLatLng(results[0]);
        setEventCoordinates([lat, lng]);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          className="auto-complete-suggestions-item suggestions-li"
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        id="pac-input"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="כתובת מקום ההתנדבות"
        required
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <div className="auto-complete-suggestions-wrapper">
          <ul multiple className="auto-complete-suggestions">
            {renderSuggestions()}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoCompletePlace;
