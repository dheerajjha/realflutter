"use client";
import * as Tooltip from '@radix-ui/react-tooltip';

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="#62A5DA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 2V9H20" stroke="#62A5DA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#62A5DA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16V12" stroke="#62A5DA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8H12.01" stroke="#62A5DA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CustomTooltip = ({ 
  children, 
  show, 
  content, 
  multiline = false,
  icon = "info" 
}) => {
  const Icon = icon === "file" ? FileIcon : InfoIcon;

  return (
    <Tooltip.Root open={show}>
      <Tooltip.Trigger asChild>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className={`bg-gradient-to-r from-[#1A2B3A] to-[#0F1923] px-4 py-3 rounded-lg shadow-xl text-sm text-white z-50 border border-[#62A5DA]/20 backdrop-blur-sm ${multiline ? 'max-w-[280px]' : ''}`}
          side="bottom"
          sideOffset={5}
          align="center"
        >
          <div className={`flex ${multiline ? 'items-start' : 'items-center'} gap-2`}>
            <Icon />
            {multiline ? (
              <div className="flex flex-col">
                {Array.isArray(content) ? content.map((line, i) => (
                  <span key={i}>{line}</span>
                )) : content}
              </div>
            ) : (
              <span>{content}</span>
            )}
          </div>
          <Tooltip.Arrow className="fill-[#1A2B3A]" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export default CustomTooltip; 