import { TextField } from "@mui/material";

function SearchBar({ searchText, setSearchText }) {
    return (
        <TextField
            label="Search Projects"
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ marginBottom: 3 }}
        />
    );
}

export default SearchBar;