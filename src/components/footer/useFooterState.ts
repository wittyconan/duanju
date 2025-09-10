import { useReducer, useCallback } from 'react';

export type DialogType = 
  | 'aboutUs'
  | 'faq' 
  | 'userAgreement'
  | 'privacyPolicy'
  | 'contactUs'
  | 'userGuide'
  | 'feedback'
  | 'support';

interface FooterState {
  openDialog: DialogType | null;
  emailCopied: boolean;
}

type FooterAction = 
  | { type: 'OPEN_DIALOG'; dialog: DialogType }
  | { type: 'CLOSE_DIALOG' }
  | { type: 'SET_EMAIL_COPIED'; copied: boolean };

const initialState: FooterState = {
  openDialog: null,
  emailCopied: false,
};

function footerReducer(state: FooterState, action: FooterAction): FooterState {
  switch (action.type) {
    case 'OPEN_DIALOG':
      return { ...state, openDialog: action.dialog };
    case 'CLOSE_DIALOG':
      return { ...state, openDialog: null };
    case 'SET_EMAIL_COPIED':
      return { ...state, emailCopied: action.copied };
    default:
      return state;
  }
}

export function useFooterState() {
  const [state, dispatch] = useReducer(footerReducer, initialState);

  const openDialog = useCallback((dialog: DialogType) => {
    dispatch({ type: 'OPEN_DIALOG', dialog });
  }, []);

  const closeDialog = useCallback(() => {
    dispatch({ type: 'CLOSE_DIALOG' });
  }, []);

  const setEmailCopied = useCallback((copied: boolean) => {
    dispatch({ type: 'SET_EMAIL_COPIED', copied });
  }, []);

  return {
    state,
    openDialog,
    closeDialog,
    setEmailCopied,
  };
}