"use client"

import React from 'react';
import { FOOTER_CONFIG } from '@/config/footer';
import { useFooterState } from './useFooterState';
import { AboutDialog } from './AboutDialog';
import { FaqDialog } from './FaqDialog';
import { ContactDialog } from './ContactDialog';
import { UserAgreementDialog } from './UserAgreementDialog';
import { PrivacyPolicyDialog } from './PrivacyPolicyDialog';
import { UserGuideDialog } from './UserGuideDialog';
import { FeedbackDialog } from './FeedbackDialog';
import { SupportDialog } from './SupportDialog';

export const Footer = React.memo(() => {
  const { state, openDialog, closeDialog } = useFooterState();

  return (
    <>
      <footer className="bg-muted/50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4 cursor-pointer select-none">
                <img 
                  src={FOOTER_CONFIG.company.logoPath} 
                  alt={FOOTER_CONFIG.company.name} 
                  className="h-6 w-6 dark:opacity-80 dark:brightness-90 pointer-events-none"
                  draggable="false"
                />
                <h3 className="font-bold text-lg">{FOOTER_CONFIG.company.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {FOOTER_CONFIG.company.description}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">关于</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <span 
                    className="cursor-pointer hover:text-foreground transition-colors inline-block py-1"
                    onClick={() => openDialog('aboutUs')}
                  >
                    关于我们
                  </span>
                </li>
                <li>
                  <span 
                    className="cursor-pointer hover:text-foreground transition-colors inline-block py-1"
                    onClick={() => openDialog('userAgreement')}
                  >
                    用户协议
                  </span>
                </li>
                <li>
                  <span 
                    className="cursor-pointer hover:text-foreground transition-colors inline-block py-1"
                    onClick={() => openDialog('privacyPolicy')}
                  >
                    隐私政策
                  </span>
                </li>
                <li>
                  <span 
                    className="cursor-pointer hover:text-foreground transition-colors inline-block py-1"
                    onClick={() => openDialog('contactUs')}
                  >
                    联系我们
                  </span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">帮助</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <span 
                    className="cursor-pointer hover:text-foreground transition-colors inline-block py-1"
                    onClick={() => openDialog('userGuide')}
                  >
                    使用说明
                  </span>
                </li>
                <li>
                  <span 
                    className="cursor-pointer hover:text-foreground transition-colors inline-block py-1"
                    onClick={() => openDialog('faq')}
                  >
                    常见问题
                  </span>
                </li>
                <li>
                  <span 
                    className="cursor-pointer hover:text-foreground transition-colors inline-block py-1"
                    onClick={() => openDialog('feedback')}
                  >
                    意见反馈
                  </span>
                </li>
                <li>
                  <span 
                    className="cursor-pointer hover:text-foreground transition-colors inline-block py-1"
                    onClick={() => openDialog('support')}
                  >
                    技术支持
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            <p>© {FOOTER_CONFIG.company.year} {FOOTER_CONFIG.company.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AboutDialog 
        open={state.openDialog === 'aboutUs'} 
        onOpenChange={() => state.openDialog === 'aboutUs' && closeDialog()} 
      />
      
      <FaqDialog 
        open={state.openDialog === 'faq'} 
        onOpenChange={() => state.openDialog === 'faq' && closeDialog()} 
      />
      
      <ContactDialog 
        open={state.openDialog === 'contactUs'} 
        onOpenChange={() => state.openDialog === 'contactUs' && closeDialog()}
      />
      
      <UserAgreementDialog 
        open={state.openDialog === 'userAgreement'} 
        onOpenChange={() => state.openDialog === 'userAgreement' && closeDialog()}
      />
      
      <PrivacyPolicyDialog 
        open={state.openDialog === 'privacyPolicy'} 
        onOpenChange={() => state.openDialog === 'privacyPolicy' && closeDialog()}
      />
      
      <UserGuideDialog 
        open={state.openDialog === 'userGuide'} 
        onOpenChange={() => state.openDialog === 'userGuide' && closeDialog()}
      />
      
      <FeedbackDialog 
        open={state.openDialog === 'feedback'} 
        onOpenChange={() => state.openDialog === 'feedback' && closeDialog()}
      />
      
      <SupportDialog 
        open={state.openDialog === 'support'} 
        onOpenChange={() => state.openDialog === 'support' && closeDialog()}
      />
    </>
  );
});

Footer.displayName = 'Footer';