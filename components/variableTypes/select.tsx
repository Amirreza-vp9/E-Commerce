import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface props {
  options: string[];
}

const SelectType = ({ options }: props) => {
  const [selectArray, setSelectArray] = useState<number[]>([]);
  const [selected, setSelected] = useState<string>("");

  const handleChangeSelect = (event: any) => {
    setSelected(event.target.value as string);
  };

  const addSelect = () => {
    const cloneSelect = [...selectArray];
    cloneSelect.push(1);
    setSelectArray(cloneSelect);
  };

  const deleteSelect = () => {
    const cloneSelect = [...selectArray];
    cloneSelect.pop();
    setSelectArray(cloneSelect);
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
          <InputLabel id="demo-simple-select-label">Select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected}
            label="select"
            sx={{ width: "90%" }}
            onChange={handleChangeSelect}
          >
            {options.map((item, i) => {
              return (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              );
            })}
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

export default SelectType;
