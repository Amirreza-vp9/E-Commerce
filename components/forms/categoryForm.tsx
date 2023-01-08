import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BasicModal from "./modal";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ports = ["usb", "hdmi", "wifi"];

function getStyles(port: string, portName: readonly string[], theme: any) {
  return {
    fontWeight:
      portName.indexOf(port) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface CONDITION {
  type: string;
  options: string[];
}

const CategoryForm = () => {
  const [name, setName] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [condition, setCondition] = useState<any>([]);
  const theme = useTheme();
  const [portName, setPortname] = React.useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");

  console.log(condition);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("object");
  };

  const addVar = () => {
    setOpenModal(true);
  };

  const deleteSelectType = (index: number) => {
    const clone = [...condition];
    clone.splice(index, 1);
    setCondition(clone);
  };

  const handleChangeMultiSelect = (event: any) => {
    const {
      target: { value },
    } = event;
    setPortname(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeSelect = (event: any) => {
    setSelected(event.target.value as string);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1em",
          }}
        >
          <Grid item>
            <TextField
              id="name-input"
              name="name"
              label="Name"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            <Button variant="contained" onClick={addVar}>
              add variable
            </Button>
          </Grid>
          <Grid item>
            {condition.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: ".25em",
                  }}
                >
                  {item}
                  {/* <>
                    {item.type === "select" ? (
                      <FormControl sx={{ m: 1, width: 250 }}>
                        <Box
                          sx={{
                            display: "felx",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Select
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selected}
                            label="select"
                            sx={{ width: "90%" }}
                            onChange={handleChangeSelect}
                          >
                            {item.options.map((el, i1) => {
                              return (
                                <MenuItem key={i1} value={el}>
                                  {el}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          <DeleteOutlineOutlinedIcon
                            sx={{
                              "&:hover": {
                                color: "red",
                                cursor: "pointer",
                              },
                            }}
                            onClick={() => deleteSelectType(index)}
                          />
                        </Box>
                      </FormControl>
                    ) : (
                      ""
                    )}
                  </>
                  <>
                    {item.type === "multiSelect" ? (
                      <FormControl sx={{ m: 1, width: 250 }}>
                        <Box
                          sx={{
                            display: "felx",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <InputLabel id="demo-multiple-chip-label">
                            multi Select
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            sx={{ width: "90%" }}
                            value={portName}
                            onChange={handleChangeMultiSelect}
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {item.options.map((el, i2) => (
                              <MenuItem
                                key={i2}
                                value={el}
                                style={getStyles(el, portName, theme)}
                              >
                                {el}
                              </MenuItem>
                            ))}
                          </Select>
                          <DeleteOutlineOutlinedIcon
                            sx={{
                              "&:hover": {
                                color: "red",
                                cursor: "pointer",
                              },
                            }}
                            onClick={() => deleteSelectType(index)}
                          />
                        </Box>
                      </FormControl>
                    ) : (
                      ""
                    )}
                  </> */}
                </Box>
              );
            })}
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
      <BasicModal
        open={openModal}
        setOpen={setOpenModal}
        setCondition={setCondition}
        condition={condition}
      />
    </>
  );
};
export default CategoryForm;
