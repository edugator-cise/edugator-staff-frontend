import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import styled from '@emotion/styled'
import theme from '../../shared/theme'

interface ImageBlockProps {
    src: string,
    caption: string,
}

function ImageBlock(props : ImageBlockProps) {
  return (
      <>
        <img style={{alignSelf: 'center'}} src={props.src} />
        <p style={{color: 'grey', alignSelf: 'center', fontFamily: 'Inter'}}>{props.caption}</p>
      </>
  )
}

export default ImageBlock