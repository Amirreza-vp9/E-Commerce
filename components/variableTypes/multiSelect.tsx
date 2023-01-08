import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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

function getStyles(port: string, portName: readonly string[], theme: any) {
  return {
    fontWeight:
      portName.indexOf(port) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface props {
  options: string[];
}

const MultiSelect = ({ options }: props) => {
  const [portName, setPortname] = React.useState<string[]>([]);
  const theme = useTheme();

  const handleChangeMultiSelect = (event: any) => {
    const {
      target: { value },
    } = event;
    setPortname(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 250 }}>
        <Box
          sx={{
            display: "felx",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputLabel id="demo-multiple-chip-label">multi Select</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            sx={{ width: "90%" }}
            value={portName}
            onChange={handleChangeMultiSelect}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
            {options.map((item, i) => (
              <MenuItem
                key={i}
                value={item}
                style={getStyles(item, portName, theme)}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
          {/* <DeleteOutlineOutlinedIcon
                            sx={{
                              "&:hover": {
                                color: "red",
                                cursor: "pointer",
                              },
                            }}
                            onClick={() => deleteSelectType(index)}
                          /> */}
        </Box>
      </FormControl>
    </>
  );
};

export default MultiSelect;
