import { TurnedInNot } from "@mui/icons-material"
import { Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"

export const Sidebar = ({ drawerWidth }) => {
  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant="permanent"
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper' : { boxSizing: 'border-box', width: drawerWidth } 
            }}
        >
            <Toolbar>
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                >
                    Manuel Ulate
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    ['Enero', 'Febrero', 'Marzo', 'Abril'].map( ( month ) => (
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid>
                                    <ListItemText primary={ month }/>
                                    <ListItemText secondary={ 'Lo que sea aquí' }/>

                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
