import React, { useCallback, useMemo } from 'react';
import type * as ts from 'typescript';

import styles from '../ast/ASTViewer.module.css';
import PropertyName from '../ast/PropertyName';
import { tsEnumValue } from '../ast/tsUtils';
import type { OnHoverNodeFn } from '../ast/types';
import { getRange, isTSNode } from '../ast/utils';

export interface SimplifiedTreeViewProps {
  readonly value: ts.Node;
  readonly selectedNode: ts.Node | undefined;
  readonly onSelect: (value: ts.Node) => void;
  readonly onHoverNode?: OnHoverNodeFn;
}

function SimplifiedItem({
  value,
  onSelect,
  selectedNode,
  onHoverNode,
}: SimplifiedTreeViewProps): JSX.Element {
  const items = useMemo(() => {
    const result: ts.Node[] = [];
    value.forEachChild(child => {
      result.push(child);
    });
    return result;
  }, [value]);

  const onHover = useCallback(
    (v: boolean) => {
      if (isTSNode(value) && onHoverNode) {
        return onHoverNode(v ? getRange(value, 'tsNode') : undefined);
      }
    },
    [onHoverNode, value],
  );

  return (
    <div className={styles.expand}>
      <span className={selectedNode === value ? styles.selected : ''}>
        <PropertyName
          propName={tsEnumValue('SyntaxKind', value.kind)}
          onHover={onHover}
          onClick={(e): void => {
            e.preventDefault();
            onSelect(value);
          }}
        />
      </span>

      <div className={styles.subList}>
        {items.map((item, index) => {
          return (
            <SimplifiedTreeView
              onHoverNode={onHoverNode}
              selectedNode={selectedNode}
              value={item}
              onSelect={onSelect}
              key={index.toString()}
            />
          );
        })}
      </div>
    </div>
  );
}

export function SimplifiedTreeView(
  params: SimplifiedTreeViewProps,
): JSX.Element {
  return (
    <div className={styles.list}>
      <SimplifiedItem {...params} />
    </div>
  );
}