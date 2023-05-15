import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { boardService } from "../services/board.service.local"
import { BiSearch } from "react-icons/bi";
import { utilService } from "../services/util.service";

export function BoardFilter({ onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(boardService.getDefaultFilter())
  const onSetFilterRef = useRef(utilService.debounce(onSetFilter))

  useEffect(() => {
    onSetFilterRef.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value } = target
    if (target.type === 'text') {
      setFilterByToEdit(prevFilter => ({ ...prevFilter, title: value }))
    } else {
      value = JSON.parse(target.value)
      setFilterByToEdit(prevFilter => ({ ...prevFilter, sortBy: value.sortBy, sortDesc: value.sortDesc }))
    }
  }

  return (
    <div className="board-filter">
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <div className="form-container">
          <div className="form-item-sort">
            <InputLabel id="SortBy">Sort</InputLabel>
            <Select
              labelId="SortBy"
              id="SortBy"
              value={JSON.stringify({ sortBy: filterByToEdit?.sortBy, sortDesc: filterByToEdit?.sortDesc })}
              label="SortBy"
              onChange={handleChange}
            >
              <MenuItem value={JSON.stringify({ sortBy: 'title', sortDesc: 1 })}>Alphabetically A-Z</MenuItem>
              <MenuItem value={JSON.stringify({ sortBy: 'title', sortDesc: -1 })}>Alphabetically Z-A</MenuItem>
            </Select>
          </div>
          <div className="form-item-search">
            <TextField
              id="title"
              label="Search"
              size="small"
              onChange={handleChange}
              value={filterByToEdit.title}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiSearch />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </div>
        </div>
      </FormControl>
    </div>
  )
}
