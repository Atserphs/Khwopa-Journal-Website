"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, Edit, Plus, Shield, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AdminSidebar from "@/components/admin-sidebar"

export default function RolesManagement() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles = [
    {
      id: "1",
      name: "Administrator",
      description: "Full access to all system features and settings",
      usersCount: 12,
      permissions: {
        users: ["view", "create", "edit", "delete"],
        roles: ["view", "create", "edit", "delete"],
        content: ["view", "create", "edit", "delete", "publish"],
        submissions: ["view", "create", "edit", "delete", "approve"],
        settings: ["view", "edit"],
      },
    },
    {
      id: "2",
      name: "Editor",
      description: "Can manage content and review submissions",
      usersCount: 48,
      permissions: {
        users: ["view"],
        roles: ["view"],
        content: ["view", "create", "edit", "publish"],
        submissions: ["view", "edit", "approve"],
        settings: ["view"],
      },
    },
    {
      id: "3",
      name: "Reviewer",
      description: "Can review and comment on submissions",
      usersCount: 156,
      permissions: {
        users: [],
        roles: [],
        content: ["view"],
        submissions: ["view"],
        settings: [],
      },
    },
    {
      id: "4",
      name: "Author",
      description: "Can create and submit content",
      usersCount: 2327,
      permissions: {
        users: [],
        roles: [],
        content: ["view", "create"],
        submissions: ["view", "create"],
        settings: [],
      },
    },
    {
      id: "5",
      name: "Guest",
      description: "Limited access to public content only",
      usersCount: 0,
      permissions: {
        users: [],
        roles: [],
        content: ["view"],
        submissions: [],
        settings: [],
      },
    },
  ]

  const permissionCategories = [
    {
      name: "User Management",
      key: "users",
      permissions: [
        { name: "View Users", key: "view" },
        { name: "Create Users", key: "create" },
        { name: "Edit Users", key: "edit" },
        { name: "Delete Users", key: "delete" },
      ],
    },
    {
      name: "Role Management",
      key: "roles",
      permissions: [
        { name: "View Roles", key: "view" },
        { name: "Create Roles", key: "create" },
        { name: "Edit Roles", key: "edit" },
        { name: "Delete Roles", key: "delete" },
      ],
    },
    {
      name: "Content Management",
      key: "content",
      permissions: [
        { name: "View Content", key: "view" },
        { name: "Create Content", key: "create" },
        { name: "Edit Content", key: "edit" },
        { name: "Delete Content", key: "delete" },
        { name: "Publish Content", key: "publish" },
      ],
    },
    {
      name: "Submission Management",
      key: "submissions",
      permissions: [
        { name: "View Submissions", key: "view" },
        { name: "Create Submissions", key: "create" },
        { name: "Edit Submissions", key: "edit" },
        { name: "Delete Submissions", key: "delete" },
        { name: "Approve Submissions", key: "approve" },
      ],
    },
    {
      name: "System Settings",
      key: "settings",
      permissions: [
        { name: "View Settings", key: "view" },
        { name: "Edit Settings", key: "edit" },
      ],
    },
  ]

  const selectedRoleData = selectedRole ? roles.find((role) => role.id === selectedRole) : null

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>

            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Create New Role</span>
            </Button>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Roles</CardTitle>
                <CardDescription>Manage user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedRole === role.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                      }`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Shield
                            className={`h-5 w-5 mr-3 ${
                              role.name === "Administrator"
                                ? "text-yellow-600"
                                : role.name === "Editor"
                                  ? "text-purple-600"
                                  : role.name === "Reviewer"
                                    ? "text-green-600"
                                    : role.name === "Author"
                                      ? "text-blue-600"
                                      : "text-gray-600"
                            }`}
                          />
                          <div>
                            <h3 className="font-medium">{role.name}</h3>
                            <p className="text-sm text-gray-500">{role.description}</p>
                          </div>
                        </div>
                        <Badge>{role.usersCount} users</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedRoleData ? selectedRoleData.name : "Select a Role"}</CardTitle>
                    <CardDescription>
                      {selectedRoleData
                        ? selectedRoleData.description
                        : "Click on a role to view and edit its permissions"}
                    </CardDescription>
                  </div>
                  {selectedRoleData && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Edit className="h-4 w-4" /> Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Duplicate Role</DropdownMenuItem>
                          <DropdownMenuItem>View Users</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="h-4 w-4 mr-2" /> Delete Role
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </CardHeader>

              {selectedRoleData ? (
                <Tabs defaultValue="permissions">
                  <div className="px-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="permissions">Permissions</TabsTrigger>
                      <TabsTrigger value="users">Users</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="permissions">
                    <CardContent>
                      <div className="space-y-6">
                        {permissionCategories.map((category) => (
                          <div key={category.key}>
                            <h3 className="font-medium mb-3">{category.name}</h3>
                            <div className="space-y-3 ml-2">
                              {category.permissions.map((permission) => (
                                <div key={permission.key} className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`${category.key}-${permission.key}`}
                                      checked={selectedRoleData.permissions[category.key]?.includes(permission.key)}
                                      disabled={selectedRoleData.name === "Administrator"}
                                    />
                                    <label
                                      htmlFor={`${category.key}-${permission.key}`}
                                      className="text-sm cursor-pointer"
                                    >
                                      {permission.name}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {category.key !== permissionCategories[permissionCategories.length - 1].key && (
                              <Separator className="mt-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="auto-update"
                          disabled={selectedRoleData.name === "Administrator"}
                          checked={selectedRoleData.name === "Administrator"}
                        />
                        <label htmlFor="auto-update" className="text-sm">
                          Grant all permissions
                        </label>
                      </div>
                      <Button disabled={selectedRoleData.name === "Administrator"}>Save Changes</Button>
                    </CardFooter>
                  </TabsContent>

                  <TabsContent value="users">
                    <CardContent>
                      <div className="text-center py-8">
                        <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium">
                          {selectedRoleData.usersCount} users with {selectedRoleData.name} role
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedRoleData.usersCount > 0
                            ? "Click the button below to view and manage users with this role"
                            : "No users currently have this role assigned"}
                        </p>
                        <Button variant="outline" className="mt-4">
                          View Users
                        </Button>
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              ) : (
                <CardContent>
                  <div className="text-center py-12">
                    <Shield className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">Select a role to view details</h3>
                    <p className="text-sm text-gray-400 mt-2">
                      Click on one of the roles from the left panel to view and edit its permissions
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          <Card className="mt-8 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Create New Role</CardTitle>
              <CardDescription>Define a new role with custom permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="roleName" className="text-sm font-medium">
                      Role Name
                    </label>
                    <Input id="roleName" placeholder="Enter role name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="roleSlug" className="text-sm font-medium">
                      Role Slug
                    </label>
                    <Input id="roleSlug" placeholder="Enter role slug (e.g., senior-editor)" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="roleDescription" className="text-sm font-medium">
                    Description
                  </label>
                  <Input id="roleDescription" placeholder="Enter role description" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium mb-2">Base Permissions On</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <Checkbox id={`base-${role.id}`} className="mr-2" />
                          <label htmlFor={`base-${role.id}`} className="text-sm cursor-pointer">
                            {role.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Create Role
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}
