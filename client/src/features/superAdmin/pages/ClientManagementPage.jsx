import { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui-custom/button';
import { Checkbox } from '@/components/ui-custom/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui-custom/dropdown-menu';
import { Input } from '@/components/ui-custom/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui-custom/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui-custom/dialog';
import { Label } from '@/components/ui-custom/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui-custom/select';
import { Toast } from '@/components/ui/toast';

import {
  addClient,
  deleteClient,
  getClientList,
  putClient,
} from '@/api/v1/superAdmin/client/clientApi.js';

const ClientManagementPage = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [adminList, setAdminList] = useState([]);

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            First Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('firstName')}</div>,
    },

    {
      accessorKey: 'lastName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Last Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('lastName')}</div>,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => <div>{row.getValue('phone')}</div>,
    },
    // {
    //   accessorKey: 'category',
    //   header: 'Category',
    //   cell: ({ row }) => (
    //     <div className="capitalize">
    //       {row.getValue('category')}
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: 'subCategory',
    //   header: 'Sub Category',
    //   cell: ({ row }) => (
    //     <div className="capitalize">
    //       {row.getValue('subCategory')}
    //     </div>
    //   ),
    // },

    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status');
        return (
          <div
            className={`capitalize ${status === true ? 'text-green-600' : 'text-red-600'}`}>
            {status === true ? 'Active' : 'Inactive'}
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const admin = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setEditingAdmin(admin)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteAdmin(admin._id)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleToggleStatus(admin._id)}>
                Toggle Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const queries = useQueries({
    queries: [
      {
        queryKey: ['superAdminClientList'],
        queryFn: () => getClientList().then((data) => data.payload),
      },
    ],
  });

  const [adminQuery] = queries;
  const table = useReactTable({
    data: adminList,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    if (adminQuery.data) {
      setAdminList(adminQuery.data);
    }
  }, [adminQuery.data]);

  if (adminQuery.isLoading) return <div>Loading...</div>;
  if (adminQuery.error)
    return <div>Error loading data: {adminQuery.error?.message}</div>;

  async function handleAddClient(clientInfo) {
    try {
      const response = await addClient(clientInfo);
      if (response.status === 'success') {
        setAdminList((prevList) => [...prevList, response.payload]);
        setEditingAdmin(null);
        setIsAddingAdmin(false);
        Toast({
          title: 'Admin Added',
          description: 'The admin has been successfully added.',
        });
      } else {
        console.error('Failed to add admin:', response.message);
        Toast({
          title: 'Error',
          description: 'Failed to add admin. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      Toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  }

  async function handleUpdateAdmin(adminId, adminInfo) {
    try {
      const response = await putClient(adminId, adminInfo);
      if (response.status === 'success') {
        setAdminList((prevList) =>
          prevList.map((admin) =>
            admin._id === adminId ? response.payload : admin,
          ),
        );
        setEditingAdmin(null);
        Toast({
          title: 'Admin Updated',
          description: 'The admin has been successfully updated.',
        });
      } else {
        console.error('Failed to update admin:', response.message);
        Toast({
          title: 'Error',
          description: 'Failed to update admin. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      Toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  }

  const handleDeleteAdmin = async (adminId) => {
    try {
      const response = await deleteClient(adminId);
      if (response.status === 'success') {
        setAdminList((prevList) =>
          prevList.filter((admin) => admin._id !== adminId),
        );
        Toast({
          title: 'Admin Deleted',
          description: 'The Admin has been successfully deleted.',
        });
      } else {
        console.error('Failed to delete admin:', response.message);
        Toast({
          title: 'Error',
          description: 'Failed to delete admin. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      Toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleStatus = (adminId) => {
    setAdminList((prevAdmins) => {
      return prevAdmins.map((admin) => {
        if (admin._id === adminId) {
          return {
            ...admin,
            status: !admin.status,
          };
        }
        return admin;
      });
    });
    Toast({
      title: 'status Updated',
      description: "The admin's status has been updated.",
    });
  };

  const handleSaveAdmin = (admin) => {
    if (admin._id) {
      handleUpdateAdmin(admin._id, admin);
    } else {
      handleAddClient(admin);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter admins..."
          value={table.getColumn('firstName')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('firstName')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => {
              setEditingAdmin({});
              setIsAddingAdmin(true);
            }}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Admin
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border dark:border-neutral-800">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm dark:text-white">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>

      <Dialog
        open={!!editingAdmin || isAddingAdmin}
        onOpenChange={() => {
          setEditingAdmin(null);
          setIsAddingAdmin(false);
        }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingAdmin?._id ? 'Edit Admin' : 'Add Admin'}
            </DialogTitle>
            <DialogDescription>
              {editingAdmin?._id
                ? "Make changes to the admin's information here."
                : 'Add a new admin to the system.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                value={editingAdmin?.firstName ?? ''}
                onChange={(e) =>
                  setEditingAdmin((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={editingAdmin?.lastName ?? ''}
                onChange={(e) =>
                  setEditingAdmin((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={editingAdmin?.email ?? ''}
                onChange={(e) =>
                  setEditingAdmin((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={editingAdmin?.phone ?? ''}
                onChange={(e) =>
                  setEditingAdmin((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                onValueChange={(value) =>
                  setEditingAdmin((prev) => ({
                    ...prev,
                    status: value === 'true',
                  }))
                }
                value={editingAdmin?.status?.toString() ?? ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select admin status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleSaveAdmin(editingAdmin)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ClientManagementPage;
