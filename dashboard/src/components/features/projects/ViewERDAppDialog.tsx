import { Button } from "@/components/ui/button"
import { DialogHeader, DialogFooter, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { ProjectData, ProjectWithBranch } from "./Projects"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"

export const ViewERDDialogContent = ({ data }: { data: ProjectData[] }) => {

    const [apps, setApps] = useState<string[]>([])

    const navigate = useNavigate()

    const onViewERD = () => {
        navigate('/project-erd', {
            state: {
                apps: apps
            }
        })
    }

    return (
        <DialogContent className="sm:max-w-[600px] sm:max-h-[800px] overflow-y-scroll">
            <DialogHeader>
                <DialogTitle>Select Apps</DialogTitle>
                <DialogDescription>
                    Select the apps to view ERD
                </DialogDescription>
            </DialogHeader>
            <ul role="list" className="divide-y divide-gray-200">
                {data?.map((org: ProjectData) => {
                    return org.projects.map((project => {
                        return (
                            <ViewERDProjectCard project={project} key={project.name} setApps={setApps} apps={apps} />
                        )
                    }
                    ))
                })}
            </ul>
            <DialogFooter>
                <Button onClick={onViewERD}>View ERD</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export interface ViewERDProjectCardProps {
    project: ProjectWithBranch
    setApps: (apps: string[]) => void
    apps: string[]
}

export const ViewERDProjectCard = ({ project, apps, setApps }: ViewERDProjectCardProps) => {

    const [branch, setBranch] = useState<string>(project.branches[0]?.name)

    const appNameInitials = useMemo(() => {
        return project.display_name.split('_').map((word) => word[0]).join('').toUpperCase()
    }, [project])
    return (
        <li className="w-full h-auto hover:shadow-sm">
            <div className="py-2 flex flex-col justify-between">
                <div className="flex space-x-4 items-center justify-between">
                    <div className="flex space-x-3 items-center">
                        <Checkbox
                            checked={apps.includes(branch)}
                            className="border-gray-300 text-gray-600 shadow-sm"
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    setApps([...apps, branch])
                                } else {
                                    setApps(apps.filter((app) => app !== branch))
                                }
                            }}
                        />
                        <Avatar className="h-8 w-8 rounded-md">
                            <AvatarImage src={project.image} />
                            <AvatarFallback className="h-8 w-8 rounded-md">{appNameInitials}</AvatarFallback>
                        </Avatar>
                        <h1 className="text-lg font-medium tracking-normal">{project.display_name}</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Select
                            onValueChange={(value) => setBranch(value)}
                            defaultValue={project.branches[0]?.name}
                        >
                            <SelectTrigger className="h-8 w-40">
                                <SelectValue placeholder="Select Branch" />
                            </SelectTrigger>
                            <SelectContent>
                                {project.branches.map((branch: CommitProjectBranch) => {
                                    return (
                                        <SelectItem value={branch.name} key={branch.name}>{branch.branch_name}</SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div >
        </li >)
}

