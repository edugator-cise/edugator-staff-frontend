import React from 'react'
import {CodeLayoutContainer} from '../../shared/CodeLayoutContainer'
import { Sidenav } from './SideNav'

export const CodeEditorPage = () => {
  return (
    <CodeLayoutContainer sideNav={<Sidenav/>}/>
  )
}