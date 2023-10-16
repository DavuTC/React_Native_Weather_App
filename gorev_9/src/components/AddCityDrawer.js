import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LiaSaveSolid } from "react-icons/lia";

import { IconContext } from "react-icons";
import React, { useState, useEffect } from "react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

function AddCityDrawer(props) {
  //https://countriesnow.space/api/v0.1/
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isCitySelectEnabled, setIsCitySelectEnabled] = useState(true);
  const [selectedISO, setSelectedISO] = useState("");

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/iso")
      .then((response) => response.json())
      .then((data) => setCountries(data.data));

    setSelectedCity("");
  }, []);

  useEffect(() => {
    if (selectedCountry !== "") {
      fetch("https://countriesnow.space/api/v0.1/countries/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: selectedCountry,
        }),
      })
        .then((response) => response.json())
        .then((data) => setCities(data.data));
      setIsCitySelectEnabled(false);
    } else {
      setCities([]);
      setIsCitySelectEnabled(true);
    }
    setSelectedCity("");
  }, [selectedCountry]);

  const saveHandler = () => {
    onClose();
    toast({
      title: "",
      description: `City ${selectedCity} added successfully`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    const cityData = {
      country: selectedCountry,
      city: selectedCity,
      id: selectedISO,
    };
    console.log(cityData);
    props.onSaveCityData(cityData);
    setSelectedCity("");
    setSelectedCountry("");
  };

  return (
    <>
      <Button
        onClick={onOpen}
        size="md"
        height="40px"
        width="120px"
        leftIcon={<AddIcon />}
        colorScheme="gray"
        variant="solid"
      >
        Şehir Ekle
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Şehir Ekle</DrawerHeader>

          <DrawerBody>
            <div style={{ marginBottom: "30px" }}>
              <label>Ülke</label>
              <Select
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedISO(
                    e.target.selectedOptions[0].getAttribute("data-key")
                  );
                }}
              >
                <option value="">Ülke Seçin</option>
                {countries.map((country) => (
                  <option
                    key={country.Iso2}
                    value={country.name}
                    data-key={country.Iso2}
                  >
                    {country.name}
                  </option>
                ))}
              </Select>
            </div>
            <label>Şehir</label>
            <Select
              disabled={isCitySelectEnabled}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option
                {...(selectedCity === "" ? { selected: true } : {})}
                value=""
              >
                Şehir Seçin
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </Select>
          </DrawerBody>

          <DrawerFooter>
            <Button
              leftIcon={<CloseIcon w={2} h={2} />}
              variant="outline"
              mr={3}
              w={100}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              bg="#1F4172"
              color="white"
              isDisabled={selectedCountry === "" || selectedCity === ""}
              onClick={saveHandler}
            >
              <IconContext.Provider value={{ color: "white", size: "1em" }}>
                <LiaSaveSolid />
              </IconContext.Provider>{" "}
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AddCityDrawer;
