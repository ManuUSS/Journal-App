import { Box } from "@mui/system"
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
        <Navbar draweWidth={drawerWidth} />
        <Sidebar draweWidth={drawerWidth} />
        <Box 
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
        >
            { children }
        </Box>
    </Box>  
  )
}
