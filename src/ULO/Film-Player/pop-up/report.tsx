import { Component, createSignal, Show } from 'solid-js';
import styles from './ReportDialog.module.css';

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details?: string) => void;
}

interface BufferingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details?: string) => void;
}

interface SubtitleIssueDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issues: string[], details?: string) => void;
}

interface AudioVideoIssueDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issues: string[], details?: string) => void;
}

interface OtherIssuesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issues: string[], details?: string) => void;
}

const BufferingDialog: Component<BufferingDialogProps> = (props) => {
  const [details, setDetails] = createSignal('');

  const handleSubmit = () => {
    props.onSubmit(details());
  };

  return (
    <Show when={props.isOpen}>
      <div class={styles.overlayFawwaz}>
        <div class={styles.dialogFawwaz}>
          <div class={styles.headerFawwaz}>
            <button class={styles.closeButtonFawwaz} onClick={props.onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <div class={styles.contentFawwaz}>
            <p class={styles.messageFawwaz}>
              Untuk masalah pemutaan video atau streaming, temukan solusinya di Pusat Bantuan ULO
            </p>
            
            <button class={styles.helpButtonFawwaz} onClick={() => window.open('/Beranda-Dekstop', '_blank')}>
              Buka Pusat Bantuan ULO
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 10L5 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M11 6L15 10L11 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>

            <div class={styles.textareaContainerFawwaz}>
              <textarea
                placeholder="Ada rincian lain? Tambahkan disini (opsional)"
                value={details()}
                onInput={(e) => setDetails(e.currentTarget.value)}
                class={styles.textareaFawwaz}
              />
            </div>

            <button 
              class={styles.submitButtonFawwaz}
              onClick={handleSubmit}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};

const SubtitleIssueDialog: Component<SubtitleIssueDialogProps> = (props) => {
  const [selectedIssues, setSelectedIssues] = createSignal<string[]>([]);
  const [details, setDetails] = createSignal('');

  const issues = [
    'Subtitle atau teks layar mengandung ketidaksesuaian (seperti kesalahan dalam ejaan, tata bahasa, atau terjemahan yang tidak akurat).',
    'Subtitle atau teks layar tidak sesuai dengan audio.',
    'Subtitle atau teks layar tidak di tampilkan dengan benar (misalnya bergerak terlalu cepat atau tidak berubah sesuai audio)',
    'Subtitle atau teks layar tidak tersedia dalam bahasa yang saya inginkan.'
  ];

  const handleIssueToggle = (issue: string) => {
    setSelectedIssues(prev => 
      prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
    );
  };

  const handleSubmit = () => {
    props.onSubmit(selectedIssues(), details());
  };

  return (
    <Show when={props.isOpen}>
      <div class={styles.overlayFawwaz}>
        <div class={styles.dialogFawwaz}>
          <div class={styles.headerFawwaz}>
            <h2>Pilih semua yang sesuai :</h2>
            <button class={styles.closeButtonFawwaz} onClick={props.onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <div class={styles.contentFawwaz}>
            {issues.map((issue) => (
              <label class={styles.checkboxLabelFawwaz}>
                <input
                  type="checkbox"
                  checked={selectedIssues().includes(issue)}
                  onChange={() => handleIssueToggle(issue)}
                />
                <span>{issue}</span>
              </label>
            ))}

            <div class={styles.textareaContainerFawwaz}>
              <textarea
                placeholder="Masalah tidak tercantum di daftar? Tambahkan disini (opsional)"
                value={details()}
                onInput={(e) => setDetails(e.currentTarget.value)}
                class={styles.textareaFawwaz}
              />
            </div>

            <button 
              class={styles.submitButtonFawwaz}
              onClick={handleSubmit}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};

const AudioVideoIssueDialog: Component<AudioVideoIssueDialogProps> = (props) => {
  const [selectedIssues, setSelectedIssues] = createSignal<string[]>([]);
  const [details, setDetails] = createSignal('');

  const issues = [
    'Audio tidak sesuai dengan video.',
    'Audio tidak ada, terlalu kecil, terlalu keras atau terlalu sering berubah.',
    'Video terkadang tidak muncul dan terlihat aneh.',
    'Alih suara audio sulit di dengar, atau berkualitas buruk.'
  ];

  const handleIssueToggle = (issue: string) => {
    setSelectedIssues(prev => 
      prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
    );
  };

  const handleSubmit = () => {
    props.onSubmit(selectedIssues(), details());
  };

  return (
    <Show when={props.isOpen}>
      <div class={styles.overlayFawwaz}>
        <div class={styles.dialogFawwaz}>
          <div class={styles.headerFawwaz}>
            <h2>Pilih semua yang sesuai :</h2>
            <button class={styles.closeButtonFawwaz} onClick={props.onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <div class={styles.contentFawwaz}>
            {issues.map((issue) => (
              <label class={styles.checkboxLabelFawwaz}>
                <input
                  type="checkbox"
                  checked={selectedIssues().includes(issue)}
                  onChange={() => handleIssueToggle(issue)}
                />
                <span>{issue}</span>
              </label>
            ))}

            <div class={styles.textareaContainerFawwaz}>
              <textarea
                placeholder="Masalah tidak tercantum di daftar? Tambahkan disini (opsional)"
                value={details()}
                onInput={(e) => setDetails(e.currentTarget.value)}
                class={styles.textareaFawwaz}
              />
            </div>

            <button 
              class={styles.submitButtonFawwaz}
              onClick={handleSubmit}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};

const OtherIssuesDialog: Component<OtherIssuesDialogProps> = (props) => {
  const [selectedIssues, setSelectedIssues] = createSignal<string[]>([]);
  const [details, setDetails] = createSignal('');

  const issues = [
    'Saya menemukan sesuatu yang tidak pantas dalam acara atau video ini.',
    'Rating usia yang di tampilkan salah.',
    'Episode atau season tidak berurutan.',
    'Judul atau deskripsi salah atau berisi kesalahan',
    'Gambar untuk acara atau film ini salah, atau menyesatkan.'
  ];

  const handleIssueToggle = (issue: string) => {
    setSelectedIssues(prev => 
      prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
    );
  };

  const handleSubmit = () => {
    props.onSubmit(selectedIssues(), details());
  };

  return (
    <Show when={props.isOpen}>
      <div class={styles.overlayFawwaz}>
        <div class={styles.dialogFawwaz}>
          <div class={styles.headerFawwaz}>
            <h2>Pilih semua yang sesuai :</h2>
            <button class={styles.closeButtonFawwaz} onClick={props.onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <div class={styles.contentFawwaz}>
            {issues.map((issue) => (
              <label class={styles.checkboxLabelFawwaz}>
                <input
                  type="checkbox"
                  checked={selectedIssues().includes(issue)}
                  onChange={() => handleIssueToggle(issue)}
                />
                <span>{issue}</span>
              </label>
            ))}

            <div class={styles.textareaContainerFawwaz}>
              <textarea
                placeholder="Masalah tidak tercantum di daftar? Tambahkan disini (opsional)"
                value={details()}
                onInput={(e) => setDetails(e.currentTarget.value)}
                class={styles.textareaFawwaz}
              />
            </div>

            <button 
              class={styles.submitButtonFawwaz}
              onClick={handleSubmit}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};

const ReportDialog: Component<ReportDialogProps> = (props) => {
  const [selectedReason, setSelectedReason] = createSignal<string>('');
  const [showBufferingDialog, setShowBufferingDialog] = createSignal(false);
  const [showSubtitleIssueDialog, setShowSubtitleIssueDialog] = createSignal(false);
  const [showAudioVideoIssueDialog, setShowAudioVideoIssueDialog] = createSignal(false);
  const [showOtherIssuesDialog, setShowOtherIssuesDialog] = createSignal(false);

  const reportReasons = [
    {
      title: 'Buffering dan Memuat',
      description: 'Video buram, buffering, dan tidak dapat di muat.'
    },
    {
      title: 'Subtitle dan Teks layar',
      description: 'Subtitle atau teks layar tampaknya tidak berfungsi dengan benar.'
    },
    {
      title: 'Audio dan Video',
      description: 'Video sulit di dengar atau dilihat.'
    },
    {
      title: 'Masalah lain',
      description: 'Ada hal yang salah dengan acara atau film tersebut.'
    }
  ];

  const handleReasonClick = (reason: string) => {
    setSelectedReason(reason);
    props.onClose(); // Close the main dialog
    if (reason === 'Buffering dan Memuat') {
      setShowBufferingDialog(true);
    } else if (reason === 'Subtitle dan Teks layar') {
      setShowSubtitleIssueDialog(true);
    } else if (reason === 'Audio dan Video') {
      setShowAudioVideoIssueDialog(true);
    } else if (reason === 'Masalah lain') {
      setShowOtherIssuesDialog(true);
    }
  };

  const handleBufferingSubmit = (details?: string) => {
    props.onSubmit('Buffering dan Memuat', details);
    setShowBufferingDialog(false);
  };

  const handleSubtitleIssueSubmit = (issues: string[], details?: string) => {
    props.onSubmit('Subtitle dan Teks layar', `Issues: ${issues.join(', ')}. Details: ${details}`);
    setShowSubtitleIssueDialog(false);
  };

  const handleAudioVideoIssueSubmit = (issues:  string[], details?: string) => {
    props.onSubmit('Audio dan Video', `Issues: ${issues.join(', ')}. Details: ${details}`);
    setShowAudioVideoIssueDialog(false);
  };

  const handleOtherIssuesSubmit = (issues: string[], details?: string) => {
    props.onSubmit('Masalah lain', `Issues: ${issues.join(', ')}. Details: ${details}`);
    setShowOtherIssuesDialog(false);
  };

  return (
    <>
      <Show when={props.isOpen}>
        <div class={styles.overlayFawwaz}>
          <div class={styles.dialogFawwaz}>
            <div class={styles.headerFawwaz}>
              <h2>Apa masalahnya?</h2>
              <button class={styles.closeButtonFawwaz} onClick={props.onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            
            <div class={styles.contentFawwaz}>
              {reportReasons.map((reason) => (
                <button
                  class={styles.reasonButtonFawwaz}
                  classList={{ [styles.selectedFawwaz]: selectedReason() === reason.title }}
                  onClick={() => handleReasonClick(reason.title)}
                >
                  <div class={styles.reasonTitleFawwaz}>{reason.title}</div>
                  <div class={styles.reasonDescriptionFawwaz}>{reason.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Show>

      <BufferingDialog
        isOpen={showBufferingDialog()}
        onClose={() => setShowBufferingDialog(false)}
        onSubmit={handleBufferingSubmit}
      />

      <SubtitleIssueDialog
        isOpen={showSubtitleIssueDialog()}
        onClose={() => setShowSubtitleIssueDialog(false)}
        onSubmit={handleSubtitleIssueSubmit}
      />

      <AudioVideoIssueDialog
        isOpen={showAudioVideoIssueDialog()}
        onClose={() => setShowAudioVideoIssueDialog(false)}
        onSubmit={handleAudioVideoIssueSubmit}
      />

      <OtherIssuesDialog
        isOpen={showOtherIssuesDialog()}
        onClose={() => setShowOtherIssuesDialog(false)}
        onSubmit={handleOtherIssuesSubmit}
      />
    </>
  );
};

export default ReportDialog;