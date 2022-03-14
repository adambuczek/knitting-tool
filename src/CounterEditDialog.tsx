import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import LabelIcon from '@mui/icons-material/Label';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import { Counter } from './counter-state';

import CustomTextField from './shared/components/CustomTextField';
import LabelDialog from './LabelDialog';

interface Props {
  isOpen: boolean;
  close: () => void;
  counter: Counter | null;
  save: (counter: Partial<Counter>) => void;
}

export default function CounterEditDialog({ isOpen, close, counter, save }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [name, setName] = useState('');
  const [max, setMax] = useState('');
  const [value, setValue] = useState('');
  const [labelMap, setLabelMap] = useState<Counter['labelMap']>({});
  const [labelCount, setLabelCount] = useState(0);

  const [addLabelDialogOpen, setAddLabelDialogOpen] = useState(false);

  const [initialIndex, setInitialIndex] = useState('');
  const [initialLabel, setInitialLabel] = useState('');


  useEffect(() => {
    if (counter) {
      setName(counter.name || '');
      setMax(counter.max ? counter.max.toString() : '');
      setValue(counter.value.toString());
      setLabelMap(counter.labelMap || {});
    }
  }, [counter]);

  useEffect(() => {
    setLabelCount(labelMap ? Object.keys(labelMap).length : 0);
  }, [labelMap]);

  const handleClose = () => {
    close();
  };

  const handleSave = () => {
    if (counter) {
      save({
        id: counter.id,
        name,
        value: parseInt(value, 10),
        max: parseInt(max, 10),
        labelMap,
      });
    }
    close();
  };

  const editLabel = (index: string) => {
    const label = labelMap?.[index];
    console.log(label, index);
    if (label) {
      setInitialIndex(index);
      setInitialLabel(label);
      setAddLabelDialogOpen(true);
    }
  }

  const removeLabel = (index: string) => {
    setLabelMap((labelMap) => {
      const newLabelMap = { ...labelMap };
      delete newLabelMap[index];
      return newLabelMap;
    });
  };

  const closeLabelDialog = () => {
    setAddLabelDialogOpen(false);
    setInitialIndex('');
    setInitialLabel('');
  };

  const fields = [
    {
      name: 'name',
      label: 'Name',
      value: name,
      type: 'text',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    },
    {
      name: 'max',
      label: 'Max',
      value: max,
      type: 'number',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setMax(e.target.value),
    },
    {
      name: 'value',
      label: 'value',
      value: value,
      type: 'number',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    },
  ]

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
      >
        {counter && (
          <>
            <DialogTitle>{"Edit Counter"}</DialogTitle>
            <DialogContent>
              {fields.map(({ name, label, value, type, onChange }) => (
                <CustomTextField key={name} label={label} type={type}
                  value={value} onChange={onChange}
                />
              ))}
              {labelCount ? (
                <>
                  <List sx={{ mt:2 }} subheader="Labels">
                    {labelMap && Object.entries(labelMap).map(([index, label]) => (
                      <ListItem key={index} secondaryAction={
                        <>  
                          <IconButton onClick={() => editLabel(index)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" onClick={() => removeLabel(index)}>
                            <CloseIcon color="error" />
                          </IconButton>
                        </>
                      }>
                        <ListItemIcon>
                          <LabelIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${index}`} />
                        <ListItemText primary={`${label}`} />
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : ''}
              <Button sx={{ mt:2 }} onClick={() => setAddLabelDialogOpen(true)}>add label</Button>
              <LabelDialog
                isOpen={addLabelDialogOpen}
                close={() => closeLabelDialog()}
                save={(label) => {
                  setLabelMap({ ...labelMap, ...label });
                }}
                initialIndex={initialIndex}
                initialLabel={initialLabel}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>close</Button>
              <Button autoFocus onClick={handleSave}>save</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
