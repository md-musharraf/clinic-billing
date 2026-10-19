import { useEffect } from 'react';

export function useEnterAsTab() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Enter') return;

      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('[data-enter-native]')) return;

      const tagName = target.tagName.toLowerCase();

      if (tagName === 'button') return;

      if (tagName === 'textarea') {
        const textarea = target as HTMLTextAreaElement;
        const rows = textarea.getAttribute('rows');
        if (!rows || parseInt(rows) > 1) return;
      }

      if (tagName !== 'input' && tagName !== 'select' && tagName !== 'textarea') return;

      if (tagName === 'input') {
        const inputType = (target as HTMLInputElement).type.toLowerCase();
        if (inputType === 'submit' || inputType === 'button' || inputType === 'reset') return;
      }

      e.preventDefault();

      const container =
        target.closest('[role="dialog"]') ||
        target.closest('.fixed.inset-0') ||
        target.closest('form') ||
        target.closest('main') ||
        document.body;

      const focusableSelectors = [
        'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
      ].join(', ');

      const focusable = Array.from(
        container.querySelectorAll(focusableSelectors)
      ).filter((el) => {
        const htmlEl = el as HTMLElement;
        const style = window.getComputedStyle(htmlEl);
        const hasDimensions = htmlEl.getBoundingClientRect().width > 0 || htmlEl.getBoundingClientRect().height > 0;
        const isStyleVisible = style.display !== 'none' && style.visibility !== 'hidden';
        return (htmlEl.offsetParent !== null || hasDimensions) && isStyleVisible && !htmlEl.hidden;
      }) as HTMLElement[];

      const currentIndex = focusable.indexOf(target);

      if (currentIndex > -1 && currentIndex < focusable.length - 1) {
        const nextElement = focusable[currentIndex + 1];
        nextElement.focus();
        if (nextElement instanceof HTMLInputElement && ['text', 'number', 'email', 'tel', 'password'].includes(nextElement.type)) {
          nextElement.select();
        }
      } else if (currentIndex === focusable.length - 1) {
        const submitButton =
          container.querySelector('button[type="submit"]') ||
          container.querySelector('button:has(.lucide-save)') ||
          container.querySelector('button.bg-primary:last-of-type');
        
        if (submitButton && submitButton instanceof HTMLElement) {
          submitButton.click();
          submitButton.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);
}
