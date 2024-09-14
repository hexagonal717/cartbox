import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  addProduct,
  deleteProduct,
  getProductList,
  putProduct,
} from '@/api/v1/superAdmin/superAdminApi.js';

const ProductManagementPage = () => {
  const superAdminId = useSelector(
    (state) => state.adminAuthSlice.accessToken?.adminId,
  );
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productList, setProductList] = useState([]);

  const availableCategories = {
    electronics: [
      'mobiles',
      'laptops',
      'tablets',
      'headphones',
      'smartwatches',
      'televisions',
      'cameras',
      'gaming_consoles',
      'speakers',
      'wearable_tech',
      'computer_accessories',
      'drones',
      'home_appliances',
    ],
    fashion: [
      'clothing_men',
      'shoes_men',
      'accessories_men',
      'clothing_women',
      'shoes_women',
      'accessories_women',
      'clothing_kids',
      'shoes_kids',
      'accessories_kids',
      'hats',
      'socks',
      'gloves',
      'sunglasses',
      'tracksuits',
      'activewear',
      'lingerie',
      'underwear',
    ],
    grocery: [
      'vegetables',
      'fruits',
      'dairy',
      'snacks',
      'beverages',
      'grains',
      'meat_seafood',
      'frozen_food',
      'condiments_spices',
    ],
    books: [
      'fiction',
      'non_fiction',
      'educational',
      'comics',
      'self_help',
      'children',
      'mystery',
      'science_fiction',
      'fantasy',
    ],
    furniture: [
      'living_room',
      'bedroom',
      'dining_room',
      'office',
      'kitchen',
      'outdoor',
      'storage',
    ],
    home_appliances: [
      'cookware',
      'bedding',
      'furniture',
      'home_decor',
      'kitchen_appliances',
      'storage_solutions',
      'lighting',
      'cleaning_supplies',
    ],
    beauty_and_health: [
      'skincare',
      'haircare',
      'makeup',
      'fragrances',
      'personal_care',
      'supplements',
      'fitness_equipment',
    ],
    sports_and_outdoors: [
      'sports_equipment',
      'outdoor_gear',
      'fitness',
      'camping_hiking',
      'cycling',
      'water_sports',
      'winter_sports',
      'team_sports',
    ],
    toys_and_games: [
      'action_figures',
      'puzzles',
      'board_games',
      'dolls',
      'remote_control_toys',
      'educational_toys',
      'video_games',
      'outdoor_toys',
    ],
    automotive: [
      'car_accessories',
      'motorcycle_accessories',
      'car_electronics',
      'tires_wheels',
      'car_care',
      'tools_equipment',
      'batteries_chargers',
    ],
    pet_supplies: [
      'dog_supplies',
      'cat_supplies',
      'bird_supplies',
      'fish_aquatic_supplies',
      'reptile_supplies',
      'small_animal_supplies',
    ],
    tools: [
      'hand_tools',
      'power_tools',
      'gardening_tools',
      'mechanic_tools',
      'painting_tools',
      'safety_gear',
      'tool_storage',
      'workbenches',
      'measuring_tools',
      'drills',
      'saws',
      'wrenches',
      'screwdrivers',
      'hammers',
      'pliers',
    ],
  };

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
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name').replace(/_/g, ' ')}</div>
      ),
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Price
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue('price')}</div>,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue('category').replace(/_/g, ' ')}
        </div>
      ),
    },
    {
      accessorKey: 'subCategory',
      header: 'Sub Category',
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue('subCategory').replace(/_/g, ' ')}
        </div>
      ),
    },
    {
      accessorKey: 'stockQuantity',
      header: 'Quantity',
      cell: ({ row }) => <div>{row.getValue('stockQuantity')}</div>,
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => {
        const stock = row.getValue('stock');
        return (
          <div
            className={`capitalize ${stock === true ? 'text-green-600' : 'text-red-600'}`}>
            {stock === true ? 'In Stock' : 'Out of Stock'}
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
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
              <DropdownMenuItem onClick={() => setEditingProduct(product)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteProduct(product._id)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleToggleStock(product._id)}>
                Toggle stock
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
        queryKey: ['superAdminProductList'],
        queryFn: () => getProductList().then((data) => data.payload),
      },
    ],
  });

  const [productQuery] = queries;
  const table = useReactTable({
    data: productList,
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
    if (productQuery.data) {
      setProductList(productQuery.data);
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) return <div>Loading...</div>;
  if (productQuery.error)
    return <div>Error loading data: {productQuery.error?.message}</div>;

  async function handleAddProduct(productInfo) {
    try {
      const response = await addProduct(superAdminId, productInfo);
      if (response.status === 'success') {
        setProductList((prevList) => [...prevList, response.payload]);
        setEditingProduct(null);
        setIsAddingProduct(false);
        Toast({
          title: 'Product Added',
          description: 'The product has been successfully added.',
        });
      } else {
        console.error('Failed to add product:', response.message);
        Toast({
          title: 'Error',
          description: 'Failed to add product. Please try again.',
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

  async function handleUpdateProduct(productId, productInfo) {
    try {
      const response = await putProduct(productId, productInfo);
      if (response.status === 'success') {
        setProductList((prevList) =>
          prevList.map((product) =>
            product._id === productId ? response.payload : product,
          ),
        );
        setEditingProduct(null);
        Toast({
          title: 'Product Updated',
          description: 'The product has been successfully updated.',
        });
      } else {
        console.error('Failed to update product:', response.message);
        Toast({
          title: 'Error',
          description: 'Failed to update product. Please try again.',
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

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await deleteProduct(productId);
      if (response.status === 'success') {
        setProductList((prevList) =>
          prevList.filter((product) => product._id !== productId),
        );
        Toast({
          title: 'Product Deleted',
          description: 'The product has been successfully deleted.',
        });
      } else {
        console.error('Failed to delete product:', response.message);
        Toast({
          title: 'Error',
          description: 'Failed to delete product. Please try again.',
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

  const handleToggleStock = (productId) => {
    setProductList((prevProducts) => {
      return prevProducts.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            stock: !product.stock,
          };
        }
        return product;
      });
    });
    Toast({
      title: 'Stock Updated',
      description: "The product's stock has been updated.",
    });
  };

  const handleSaveProduct = (product) => {
    if (product._id) {
      handleUpdateProduct(product._id, product);
    } else {
      handleAddProduct(product);
    }
  };

  const capitalize = (str) => {
    return str
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter products..."
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
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
              setEditingProduct({});
              setIsAddingProduct(true);
            }}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Product
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
        open={!!editingProduct || isAddingProduct}
        onOpenChange={() => {
          setEditingProduct(null);
          setIsAddingProduct(false);
        }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct?._id ? 'Edit Product' : 'Add Product'}
            </DialogTitle>
            <DialogDescription>
              {editingProduct?._id
                ? "Make changes to the product's information here."
                : 'Add a new product to the system.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editingProduct?.name ?? ''}
                onChange={(e) =>
                  setEditingProduct((prev) => ({ ...prev, name: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={editingProduct?.description ?? ''}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                value={editingProduct?.price ?? ''}
                onChange={(e) =>
                  setEditingProduct((prev) => ({ ...prev, price: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stockQuantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="stockQuantity"
                value={editingProduct?.stockQuantity ?? ''}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    stockQuantity: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                onValueChange={(value) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    category: value,
                    subCategory: '',
                  }))
                }
                value={editingProduct?.category ?? ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(availableCategories).map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="capitalize">
                      {capitalize(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subCategory" className="text-right">
                Sub Category
              </Label>
              <Select
                onValueChange={(value) =>
                  setEditingProduct((prev) => ({ ...prev, subCategory: value }))
                }
                value={editingProduct?.subCategory ?? ''}
                disabled={!editingProduct?.category}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a sub category" />
                </SelectTrigger>
                <SelectContent>
                  {editingProduct?.category &&
                    availableCategories[editingProduct.category].map(
                      (subCategory) => (
                        <SelectItem
                          key={subCategory}
                          value={subCategory}
                          className="capitalize">
                          {capitalize(subCategory)}
                        </SelectItem>
                      ),
                    )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Select
                onValueChange={(value) =>
                  setEditingProduct((prev) => ({ ...prev, stock: value === 'true' }))
                }
                value={editingProduct?.stock?.toString() ?? ''}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a stock status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleSaveProduct(editingProduct)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ProductManagementPage;
