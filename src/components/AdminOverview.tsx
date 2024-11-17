import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {fetchUrlAction, deleteUrlAction} from '../redux/urlActions'
import { RootState, AppDispatch } from "../redux/store"; 
import ResponsiveDialog from './createUrlModal'
import { Typography } from '@mui/material';


export default function AdminOverview() {

	const dispatch = useDispatch<AppDispatch>();
	const { data, loading, error } = useSelector((state:RootState)=> state.urlReducer)
	const [open, setOpen] = useState(false)
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
	const [initialData, setInitialData] = useState<{ id: string; webUrl: string; ttlInSeconds: number } | null>(null);

	function deleteUrl(id:string) {
		dispatch(deleteUrlAction(id))
	}

	const handleOpenDialog = (mode: "create" | "edit", data?: { id: string; webUrl: string; ttlInSeconds: number }) => {
		setDialogMode(mode);
		setInitialData(data || null);
		setDialogOpen(true);
	  };

	const handleCloseDialog = () => {
		setDialogOpen(false);
	  };

	useEffect( ()=>{
		dispatch(fetchUrlAction())
	},[dispatch])

	if (loading) return <Typography>Loading...</Typography>;
	if (error) return <Typography>Error: {error}</Typography>; 
	if (!data || data.length === 0) return <Typography>No URLs available</Typography>;
  return (
	<>
		<TableContainer component={Paper} style={{width: '100%'}}>
		<Table sx={{ width: '100%' }} aria-label="simple table">
			<TableHead>
			<TableRow>
				<TableCell>
					<AddOutlinedIcon style={{cursor: 'pointer'}} onClick={() => handleOpenDialog("create")}/> Add New</TableCell>
				<TableCell align="right">ID</TableCell>
				<TableCell align="center">URL</TableCell>
				<TableCell align="right">TTL seconds</TableCell>
				<TableCell align="right">Date Created</TableCell>
				<TableCell align="right">Date Modified</TableCell>

			</TableRow>
			</TableHead>
			{data&&data.length > 0 ? (
				<TableBody>

				{data.map((row: { id: string, url: string, ttlInSeconds: number,  createdDate: string,  modifiedDate: string  }, index: number) => (
					<TableRow
					key={index}
					>
					<TableCell  scope="row">
						<EditIcon onClick={() => handleOpenDialog("edit", { id: row.id, webUrl: row.url, ttlInSeconds: row.ttlInSeconds })} style={{cursor: 'pointer'}}/> 
						<DeleteIcon onClick={()=>deleteUrl(row.id)} style={{cursor: 'pointer'}}/>
					</TableCell>
					<TableCell align="right">{row.id}</TableCell>
					<TableCell align="center">{row.url}</TableCell>
					<TableCell align="right">{row.ttlInSeconds}</TableCell>
					<TableCell align="right">{row.createdDate}</TableCell>
					<TableCell align="right">{row.modifiedDate}</TableCell>

					</TableRow>
				))}
				</TableBody>

			):  (
				<p>No data available</p>
			)}
		</Table>
		</TableContainer>
		<ResponsiveDialog open={dialogOpen}  handleClose={handleCloseDialog} mode={dialogMode} initialData={initialData || {id: '', webUrl: '', ttlInSeconds: 0}}/>	
	</>
  );
}
