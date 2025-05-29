'use client'

import { useStore } from "@xyflow/react"
import React, { FC } from "react"

export type IWorkflowDetailLayoutProps = {
    children: React.ReactNode
    params: {
        workflowId: string
    }
}

const WorkflowLayout: FC<IWorkflowDetailLayoutProps> = (props) => {
    const {
        children,
        params: { workflowId },
    } = props

    const { appDetail, setAppDetail } = useStore()
}

export default WorkflowLayout