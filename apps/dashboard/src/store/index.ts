import { create } from 'zustand';
import { withSlices } from 'zustand-slices';

import { createUploadsSlice } from './uploads-slice';

export const useGlobalStore = create(withSlices(createUploadsSlice));
