import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, AddOutlined as AddOutlinedIcon } from "@mui/icons-material";
import { fetchUrlAction, deleteUrlAction } from "../redux/urlActions";
import { RootState, AppDispatch } from "../redux/store";
import ResponsiveDialog from "./createUrlModal";
import { useTranslation } from "react-i18next";
import "../i18n";

export default function AdminOverview() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.urlReducer);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [initialData, setInitialData] = useState<{ id: string; webUrl: string; ttlInSeconds: number } | null>(null);

  useEffect(() => {
    dispatch(fetchUrlAction());
  }, [dispatch]);

  const handleOpenDialog = (
    mode: "create" | "edit",
    data?: { id: string; webUrl: string; ttlInSeconds: number }
  ) => {
    setDialogMode(mode);
    setInitialData(data || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => setDialogOpen(false);

  const deleteUrl = (id: string) => dispatch(deleteUrlAction(id));

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  if (loading) return <Typography>{t("loading")}</Typography>;
  if (error) return <Typography>{error}</Typography>;
  if (!data || data.length === 0) return <Typography>{t("NoUrlsAvailable")}</Typography>;

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%", mt: 3 }}>
        <Table aria-label="URLs table">
          <TableHead sx={{ backgroundColor: "#342BC2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                <AddOutlinedIcon sx={{ cursor: "pointer" }} onClick={() => handleOpenDialog("create")} /> {t("addNew")}
              </TableCell>
              {["id", "url", "ttlInSeconds", "dateCreated", "dateModified"].map((header) => (
                <TableCell key={header} align="center" sx={{ color: "white", fontWeight: "bold" }}>
                  {t(header)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <EditIcon
                    sx={{ cursor: "pointer", mr: 1 }}
                    onClick={() =>
                      handleOpenDialog("edit", { id: row.id, webUrl: row.url, ttlInSeconds: row.ttlInSeconds })
                    }
                  />
                  <DeleteIcon sx={{ cursor: "pointer" }} onClick={() => deleteUrl(row.id)} />
                </TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.url}</TableCell>
                <TableCell align="center">{row.ttlInSeconds}</TableCell>
                <TableCell align="center">{formatDate(row.createdDate)}</TableCell>
                <TableCell align="center">{formatDate(row.modifiedDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ResponsiveDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        mode={dialogMode}
        initialData={initialData || { id: "", webUrl: "", ttlInSeconds: 0 }}
      />
    </>
  );
}
