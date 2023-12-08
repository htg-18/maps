
import { MyLocationSharp } from '@mui/icons-material';
import { Stack, Skeleton } from '@mui/material';
import React from 'react';

const MySkeleton = () => {
  const skeletonItems = Array.from({ length: 10 }, (_, index) => index);

  return (
    <Stack
      spacing={{ xs: 1, sm: 2, md: 4 }}
      direction={{ xs: 'column', sm: 'row' }}
      useFlexGap
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      paddingBottom={4}
      paddingTop={3}
    >
      {skeletonItems.map((index, key) => (
        <Skeleton variant="rounded" width={310} height={200} key={index} />
      ))}

    </Stack>
  );
};

export default MySkeleton;
